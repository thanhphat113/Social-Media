using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;

namespace Backend.Repositories;
	public class UserRepositories : IRepositories<User>
	{
		
		private readonly SocialMediaContext _context;
		public UserRepositories(SocialMediaContext context)
        {
            _context = context;
        }

		public async Task<List<User>> GetAll()
        {
			try{
				return await _context.Users.ToListAsync();
			}catch{
				return null;
			}
        }

		public async Task<List<User>> GetListByType(int condition, string type){
			throw new NotImplementedException();
		}


    	public async Task<User> GetById(int id){
			try {
				return await _context.Users.FirstOrDefaultAsync(p => id == p.UserId);
			}catch{
				return null;
			}
		}
    	public async Task<bool> Add(User user){
			try{
				var passHasher = new PasswordHasher<User>();
				user.Password = passHasher.HashPassword(user, user.Password);

				await _context.Users.AddAsync(user);
				await _context.SaveChangesAsync();
				
				return true;
			}catch (Exception ex){
				Console.WriteLine("Đây là lỗi: "+ ex.Message);
				return false;
			}
		}
    	public async Task<bool> Update(User product){
			throw new NotImplementedException();
		}
    	public async Task<bool> Delete(int id){
			throw new NotImplementedException();
		}

		public async Task<User> FindToLogin(string email, string password){
			
			try{
				var user = await _context.Users
					.FirstOrDefaultAsync(p => p.Email == email);

				if (user == null)
				{
					return null;
				}
	
				var passHasher = new PasswordHasher<User>();
        		var passwordVerificationResult = passHasher.VerifyHashedPassword(user, user.Password, password);

				if (passwordVerificationResult == PasswordVerificationResult.Success)
        		{
					return user;
				}else
				{
					return null;
				}
			}catch(Exception ex){
        		return null;
			}
			
		}

		public async Task<bool> isHasEmail (string email){
			try{
				var user = await _context.Users
					.FirstOrDefaultAsync(p => p.Email == email);

				if (user != null){
					return true;
				}

				return false;
			}catch (Exception ex){
				Console.WriteLine(ex.InnerException?.Message); 
				return false;
			}
		}

		}