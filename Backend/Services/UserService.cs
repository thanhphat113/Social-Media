using Backend.Models;
using Backend.DTO;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

using AutoMapper.QueryableExtensions;
using Backend.RealTime;


namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly JwtToken _jwtToken;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        private readonly SocialMediaContext _context;

        public UserService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper, IHttpContextAccessor httpContextAccessor,
            SocialMediaContext context)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public async Task<User> Add(User value)
        {
            try
            {
                var passHasher = new PasswordHasher<User>();
                value.Password = passHasher.HashPassword(value, value.Password);
                await _unit.Users.AddAsync(value);
                if (await _unit.CompleteAsync())
                {
                    return value;
                }
                throw new ArgumentException("Thêm vào database không thành công");
            }
            catch (System.Exception ex)
            {
                throw new Exception("Thêm sản phẩm không thành công.", ex);
            }
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserPrivate>> FriendsWithChat(int UserId, IEnumerable<UserPrivate> friends)
        {
            foreach (var item in friends)
            {
                var mess = (ICollection<ChatInMessage>)await _unit.Message.FindAsync(query => query
                                    .Where(m =>
                (m.User1 == item.UserId && m.User2 == UserId) ||
                (m.User1 == UserId && m.User2 == item.UserId)).Include(m => m.ChatInMessages)
                            .ThenInclude(c => c.Media)
                            .SelectMany(m => m.ChatInMessages));

                foreach (var x in mess)
                {
                    if (x.Media == null) continue;
                    string type = (x.Media.MediaType == 1 || x.Media.MediaType == 2) ? "media" : "file";
                    if (!x.Media.Src.StartsWith($"{_httpContextAccessor.HttpContext.Request.Scheme}://"))
                    {
                        x.Media.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{x.Media.Src}";
                    }
                }

                item.ChatInMessages = mess;
            }
            return friends;
        }

        public Task<IEnumerable<User>> GetAll()
        {
            return _unit.Users.GetAll();
        }

        public async Task<UserLogin> GetLoginById(int id)
        {
            var item = await _unit.Users.GetByIdAsync(id);

            var result = _mapper.Map<UserLogin>(item);

            var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                            .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                            .SelectMany(p => p.Medias));

            if (MediaIsProfile != null)
            {
                MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";

                result.ProfilePicture = MediaIsProfile;
            }
            return result;
        }

        public Task<IEnumerable<User>> GetListById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(User value)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserPrivate>> GetFriends(int id)
        {
            // var users = await _unit.Relationship.FindAsync<User>(predicate, selector);
            var users = await _unit.Relationship.FindAsync<UserPrivate>(query =>
                    query.Where(r =>
                            (r.FromUserId == id || r.ToUserId == id) &&
                            r.TypeRelationship == 2)
                            .Select(r => r.FromUserId == id ? r.ToUser : r.FromUser)
                            .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));

            foreach (var item in users)
            {
                var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                            .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                            .SelectMany(p => p.Medias));

                if (MediaIsProfile != null)
                {
                    MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";

                    item.ProfilePicture = MediaIsProfile;
                }
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }

        public async Task<dynamic> FindToLogin(string email, string password)
        {
            var user = await _unit.Users.GetByConditionAsync<User>(query => query.Where(u => u.Email == email));
            if (OnlineHub.IsOnline(user.UserId))
            {
                return new { IsCorrect = false, Message = "Tài khoản đã được đăng nhập ở một nơi khác" };
            }


            if (user == null) return new { IsCorrect = false, Message = "Email không tồn tại !!!" };

            var passHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passHasher.VerifyHashedPassword(user, user.Password, password);

            if (passwordVerificationResult == PasswordVerificationResult.Success)
            {
                return new { IsCorrect = true, Message = _jwtToken.GenerateJwtToken(user.UserId.ToString()) };
            }

            return new { IsCorrect = false, Message = "Mật khẩu không đúng !!!" };
        }

        public async Task<ValidateEmail> IsHasEmail(string email)
        {
            if (!email.EndsWith("@gmail.com") && !email.EndsWith("@gmail.com.vn"))
                return new ValidateEmail("Email phải có đuôi là @gmail.com hoặc @gmail.com.vn", false);
            if (string.IsNullOrEmpty(email))
                return new ValidateEmail("Vui lòng nhập email", false);

            var item = await _unit.Users.GetByConditionAsync<User>(query => query.Where(u => u.Email == email));

            if (item != null)
                return new ValidateEmail("Email này đã được đăng ký vui lòng nhập lại", false);

            return new ValidateEmail("Email hợp lệ", true);
        }

        public async Task<User> GetById(int id)
        {
            return null;
        }

        public async Task<UserPrivate> FindById(int id)
        {
            var item = await _unit.Users.GetByIdAsync(id);
            if (item == null) return null;
            var result = _mapper.Map<UserPrivate>(item);
            var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                            .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                            .SelectMany(p => p.Medias));

            if (MediaIsProfile != null)
            {
                MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";
                result.ProfilePicture = MediaIsProfile;
            }

            return result;
        }

        public async Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId)
        {
            var result = await _unit.Users.FindAsync<UserPrivate>(query => query
                                .Where(u => u.UserId != UserId &&
                                (u.LastName.Contains(name) ||
                                u.FirstName.Contains(name)))
                                .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));
            return result;
        }

        // public async Task<dynamic?> GetUserInfor(int userId)
        // {
        //     var rs = await _context.Users
        //         .AsNoTracking()
        //         .Where(x => x.UserId == userId)
        //         .Select(x => new
        //         {
        //             x.UserId,
        //             Name = $"{x.FirstName.Trim()} {x.LastName.Trim()}",
        //             SrcProfilePicture = x.UserMedia.Where(y => y.IsProfilePicture == true).Select(y => new { y.Media.Src, y.MediaId }).FirstOrDefault(),
        //             SrcCoverPhoto = x.UserMedia.Where(y => y.IsCoverPicture == true).Select(y => new { y.Media.Src, y.MediaId }).FirstOrDefault(),
        //             x.DateCreated,
        //             x.Location,
        //             NumberFriend = x.RelationshipFromUsers.Count(x => x.TypeRelationship == 2) + x.RelationshipToUsers.Count(x => x.TypeRelationship == 2),
        //             x.Bio,
        //             x.Email,
        //             x.GenderId,
        //             x.Gender!.GenderName
        //         })
        //         .FirstOrDefaultAsync();

        //     return rs;
        // }

        // public async Task<dynamic> GetUserFriends(int userId)
        // {
        //     var rs = await _context.Users
        //         .AsNoTracking()
        //         .Where(x => x.RelationshipToUsers.Any(y => y.TypeRelationship == 2 && y.FromUserId == userId) || x.RelationshipFromUsers.Any(y => y.TypeRelationship == 2 && y.ToUserId == userId))
        //         .Select(x => new
        //         {
        //             x.UserId,
        //             Name = $"{x.FirstName.Trim()} {x.LastName.Trim()}",
        //             SrcProfilePicture = x.UserMedia.Where(y => y.IsProfilePicture == true).Select(y => y.Media.Src).FirstOrDefault(),
        //             x.Location,
        //             x.GenderId,
        //         })
        //         .ToListAsync();

        //     return rs;
        // }

        // public async Task<dynamic> GetUserFollower(int userId)
        // {
        //     var rs = await _context.Users
        //         .AsNoTracking()
        //         .Where(x => x.RelationshipFromUsers.Any(y => y.TypeRelationship == 1 && y.ToUserId == userId))
        //         .Select(x => new
        //         {
        //             x.UserId,
        //             Name = $"{x.FirstName.Trim()} {x.LastName.Trim()}",
        //             SrcProfilePicture = x.UserMedia.Where(y => y.IsProfilePicture == true).Select(y => y.Media.Src).FirstOrDefault(),
        //             x.Location
        //         })
        //         .ToListAsync();

        //     return rs;
        // }

        // public async Task<dynamic> GetUserMedia(int userId)
        // {
        //     var rs = await _context.UserMedia
        //         .AsNoTracking()
        //         .Where(x => x.UserId == userId)
        //         .Select(x => new
        //         {
        //             MediaId = x.MediaId,
        //             Src = x.Media.Src,
        //         })
        //         .ToListAsync();

        //     return rs;
        // }

        // public async Task<dynamic> GetRelationshipToUser(int userId)
        // {
        //     var idUserCurrent = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //     if (idUserCurrent == null || !int.TryParse(idUserCurrent, out int idUserCurrentFormat))
        //     {
        //         return new
        //         {
        //             IsSucces = false,
        //             Message = "Phiên đăng nhập của bạn đã hết hạn!",
        //         };
        //     }

        //     if (idUserCurrentFormat == userId)
        //     {
        //         return new
        //         {
        //             IsSucces = false,
        //             Message = "Người dùng đang ở trang cá nhân",
        //         };
        //     }

        //     var relationship = await _context.Relationships
        //         .AsNoTracking()
        //         .Where(x => (x.FromUserId == userId && x.ToUserId == idUserCurrentFormat) || (x.FromUserId == idUserCurrentFormat && x.ToUserId == userId))
        //         .Select(x => x.TypeRelationshipNavigation!.TypeName)
        //         .FirstOrDefaultAsync();

        //     return new
        //     {
        //         IsSucces = true,
        //         Relationship = relationship,
        //     };
        // }

        // public async Task<dynamic> GetUserProfile(int userId)
        // {
        //     var userInfor = await GetUserInfor(userId);
        //     var userFriends = await GetUserFriends(userId);
        //     var userFollower = await GetUserFollower(userId);
        //     var userMedias = await GetUserMedia(userId);
        //     var relationshipToUser = await GetRelationshipToUser(userId);

        //     return new
        //     {
        //         userInfor,
        //         userFriends,
        //         userFollower,
        //         userMedias,
        //         relationshipToUser
        //     };
        // }

        // public async Task<dynamic> UpdateProfilePicture(int userId, int mediaId, IFormFile? file)
        // {
        //     if (file == null || file.Length == 0)
        //     {
        //         return new
        //         {
        //             IsSuccess = false,
        //             Message = "File không hợp lệ!"
        //         };
        //     }


        //     using var transaction = await _context.Database.BeginTransactionAsync();

        //     try
        //     {
        //         string folderPath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName, "Frontend", "public", "img", "Picture");
        //         if (!Directory.Exists(folderPath))
        //         {
        //             Directory.CreateDirectory(folderPath);
        //         }

        //         string fileName = $"{Guid.NewGuid().ToString()}_{Path.GetFileName(file.FileName)}";

        //         await _context.UserMedia.Where(x => x.MediaId == mediaId || x.UserId == userId).ExecuteUpdateAsync(setter => setter.SetProperty(x => x.IsProfilePicture, false));

        //         var hashFile = await MiddleWare.GetFileHashAsync(file);

        //         var idMedia = await _context.Media.AsNoTracking().Where(x => x.HashCode == hashFile).Select(x => x.MediaId).FirstOrDefaultAsync();

        //         if (idMedia == 0)
        //         {
        //             Media media = new Media
        //             {
        //                 Src = fileName,
        //                 HashCode = hashFile,
        //                 MediaType = 1
        //             };

        //             await _context.Media.AddAsync(media);
        //             await _context.SaveChangesAsync();

        //             idMedia = media.MediaId;
        //         }

        //         UserMedia userMedia = new UserMedia
        //         {
        //             UserId = userId,
        //             MediaId = idMedia,
        //             IsProfilePicture = true,
        //             IsCoverPicture = false
        //         };

        //         await _context.UserMedia.AddAsync(userMedia);
        //         await _context.SaveChangesAsync();

        //         await transaction.CommitAsync();

        //         string filePath = Path.Combine(folderPath, fileName);

        //         using (var stream = new FileStream(filePath, FileMode.Create))
        //         {
        //             await file.CopyToAsync(stream);
        //         }

        //         return new
        //         {
        //             IsSuccess = true,
        //             Message = "Cập nhật hình ảnh thành công!",
        //             FileUrl = fileName
        //         };
        //     }
        //     catch (Exception ex)
        //     {
        //         await transaction.RollbackAsync();

        //         return new
        //         {
        //             IsSuccess = false,
        //             Message = "Thất bại!",
        //             Error = ex.InnerException?.Message ?? ex.Message
        //         };
        //     }
        // }

        // public async Task<dynamic> UpdateCoverPicture(int userId, int mediaId, IFormFile? file)
        // {
        //     if (file == null || file.Length == 0)
        //     {
        //         return new
        //         {
        //             IsSuccess = false,
        //             Message = "File không hợp lệ!"
        //         };
        //     }

        //     using var transaction = await _context.Database.BeginTransactionAsync();

        //     try
        //     {
        //         string folderPath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName, "Frontend", "public", "img", "Picture");
        //         if (!Directory.Exists(folderPath))
        //         {
        //             Directory.CreateDirectory(folderPath);
        //         }

        //         string fileName = $"{Guid.NewGuid().ToString()}_{Path.GetFileName(file.FileName)}";

        //         await _context.UserMedia.Where(x => x.MediaId == mediaId || x.UserId == userId).ExecuteUpdateAsync(setter => setter.SetProperty(x => x.IsCoverPicture, false));

        //         var hashFile = await MiddleWare.GetFileHashAsync(file);

        //         var idMedia = await _context.Media.AsNoTracking().Where(x => x.HashCode == hashFile).Select(x => x.MediaId).FirstOrDefaultAsync();

        //         if (idMedia == 0)
        //         {
        //             Media media = new Media
        //             {
        //                 Src = fileName,
        //                 HashCode = hashFile,
        //                 MediaType = 1
        //             };

        //             await _context.Media.AddAsync(media);
        //             await _context.SaveChangesAsync();

        //             idMedia = media.MediaId;
        //         };

        //         UserMedia userMedia = new UserMedia
        //         {
        //             UserId = userId,
        //             MediaId = idMedia,
        //             IsProfilePicture = false,
        //             IsCoverPicture = true
        //         };

        //         await _context.UserMedia.AddAsync(userMedia);
        //         await _context.SaveChangesAsync();

        //         await transaction.CommitAsync();

        //         string filePath = Path.Combine(folderPath, fileName);

        //         using (var stream = new FileStream(filePath, FileMode.Create))
        //         {
        //             await file.CopyToAsync(stream);
        //         }

        //         return new
        //         {
        //             IsSuccess = true,
        //             Message = "Cập nhật hình ảnh thành công!",
        //             FileUrl = fileName
        //         };
        //     }
        //     catch (Exception ex)
        //     {
        //         await transaction.RollbackAsync();

        //         return new
        //         {
        //             IsSuccess = false,
        //             Message = "Thất bại!",
        //             Error = ex.InnerException?.Message ?? ex.Message
        //         };
        //     }
        // }

        public async Task<dynamic> AddFriend(int fromUserId, int toUserId)
        {
            Relationship relationship = new Relationship
            {
                FromUserId = fromUserId,
                ToUserId = toUserId,
                TypeRelationship = 1,
                DateCreated = DateTime.Now
            };

            await _context.Relationships.AddAsync(relationship);
            await _context.SaveChangesAsync();

            return new
            {
                IsSuccess = true,
                Message = "Gửi lời mời kết bạn thành công!"
            };
        }

        public async Task<dynamic> AcceptFriend(int fromUserId, int toUserId)
        {
            var rowAffect = await _context.Relationships
                .Where(x => x.FromUserId == fromUserId && x.ToUserId == toUserId)
                .Take(1)
                .ExecuteUpdateAsync(setter => setter.SetProperty(x => x.TypeRelationship, 2));

            if (rowAffect == 0)
            {
                return new
                {
                    IsSuccess = false,
                    Message = "Không tìm thấy thông tin kết bạn!"
                };
            }

            return new
            {
                IsSuccess = true,
                Message = "Kết bạn thành công!"
            };
        }

        public async Task<dynamic> DeleteFriend(int userId1, int userId2)
        {
            var rowAffect = await _context.Relationships
                .Where(x => (x.FromUserId == userId1 && x.ToUserId == userId2) || (x.FromUserId == userId2 && x.ToUserId == userId1))
                .Take(1)
                .ExecuteDeleteAsync();

            if (rowAffect == 0)
            {
                return new
                {
                    IsSuccess = false,
                    Message = "Không tìm thấy thông tin kết bạn!"
                };
            }

            return new
            {
                IsSuccess = true,
                Message = "Thành công!"
            };
        }

        public Task<dynamic> GetUserProfile(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> GetFollower(int userId)
        {
            try
            {
                return await _unit.Relationship.FindAsync(query => query
                        .Where(r => r.FromUserId == userId || r.ToUserId == userId)
                        .Where(r => r.TypeRelationship == 1)
                        .Select(r => r.FromUserId == userId ? r.ToUser : r.FromUser)
                        .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Lỗi: " + ex);
                throw;
            }
        }
    }

}