using Backend.Models;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Backend.Services;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace Backend.Services
{
    public class InformationService 
    {
        private readonly JwtToken _jwtToken;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public InformationService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
        }
        

        public async Task<bool> Update(User value)
        {
            try
            {
                
                if (!string.IsNullOrEmpty(value.Email) && !IsValidEmail(value.Email))
                {
                    throw new InvalidOperationException("Email không đúng định dạng.");
                }

                
                var existingUser = await _unit.Users.GetByIdAsync(value.UserId); 
                if (existingUser == null)
                {
                    throw new KeyNotFoundException("Không tìm thấy người dùng.");
                }
                // Console.WriteLine($"existingUser.Email: {existingUser.Email}");
                // Console.WriteLine($"value.Email: {value.Email}");


                // if (!string.Equals(existingUser.Email.Trim(), value.Email.Trim(), StringComparison.OrdinalIgnoreCase)) 
                // {
                //     var isEmailTaken = await _unit.Users.GetByConditionAsync(u => u.Email == value.Email);
                //     Console.WriteLine(isEmailTaken);
                //     if (isEmailTaken != null) 
                //     {
                //         throw new InvalidOperationException("Email này đã được sử dụng.");
                //     }
                // }


                await _unit.Users.UpdateAsync(value); // Gọi phương thức UpdateAsync từ repository
                await _unit.CompleteAsync(); // Lưu thay đổi vào cơ sở dữ liệu
                return true; // Trả về true nếu thành công
            }
            catch (Exception ex)
            {
                // Ghi log hoặc xử lý ngoại lệ tại đây nếu cần
                Console.WriteLine($"Đã xảy ra lỗi: {ex.Message}");
                return false; // Trả về false nếu có lỗi
            }
        }



// Hàm kiểm tra định dạng email
        private bool IsValidEmail(string email)
        {
            var emailRegex = new System.Text.RegularExpressions.Regex(
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            return emailRegex.IsMatch(email);
        }

        
        public async Task<bool> ChangePassword(int userId, ChangePasswordDto changePasswordDto)
        {
            try
            {
                var user = await _unit.Users.GetByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                // Kiểm tra mật khẩu hiện tại
                var passwordHasher = new PasswordHasher<User>();

                // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp không
                if (changePasswordDto.NewPassword != changePasswordDto.ConfirmPassword)
                {
                    throw new Exception("New password and confirm password do not match.");
                }

                // Hash mật khẩu mới trước khi lưu vào cơ sở dữ liệu
                var result = passwordHasher.VerifyHashedPassword(user, user.Password, changePasswordDto.CurrentPassword);
                if (result == PasswordVerificationResult.Failed)
                {
                    return false; // Mật khẩu hiện tại không chính xác
                }
                user.Password = passwordHasher.HashPassword(user, changePasswordDto.NewPassword);
                // Cập nhật người dùng với mật khẩu mới
                await _unit.Users.UpdateAsync(user);
                await _unit.CompleteAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi (log, hoặc throw exception nếu cần)
                throw new Exception("An error occurred while changing password", ex);
            }
        }



        

       
        public async Task<bool> HasEmail(string email)
        {
            // Kiểm tra xem email đã tồn tại trong hệ thống chưa
            var existingUser = await _unit.Users.FindAsync<User>(u => u.Email == email);
        
            return existingUser.Any(); // Trả về true nếu tìm thấy user với email đã tồn tại
        }

        

        public async Task<User> GetById(int id)
        {
            try
            {
                // Gọi phương thức GetByIdAsync từ GenericRepository để lấy thông tin người dùng
                var user = await _unit.Users.GetByIdAsync(id);

                if (user == null)
                {
                    // Nếu không tìm thấy người dùng, trả về null hoặc ném exception tùy theo logic của bạn
                    return null;
                }

                return user;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi, ví dụ log hoặc throw exception nếu cần
                throw new Exception("An error occurred while fetching user", ex);
            }
        }
       
    }

}