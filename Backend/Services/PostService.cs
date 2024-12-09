using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
	public class PostService(IUnitOfWork unit) : IPostService
	{
		private readonly IUnitOfWork _unit = unit;

		public async Task<Post?> Add(Post value)
		{
			try
			{
				var item = await _unit.Post.AddAsync(value);
				if (await _unit.CompleteAsync())
				{
					return item;
				}
				return null;
			}
			catch (System.Exception)
			{

				throw;
			}
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Post>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<Post> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<dynamic?> GetFriendPostsByUserId(int UserId, int OffSet, int Limit)
		{
			try
			{
				var friendsId = await _unit.Relationship.FindAsync(query => query
						.Where(r => r.FromUserId == UserId || r.ToUserId == UserId)
						.Where(r => r.TypeRelationship == 2)
						.Select(r => r.FromUserId == UserId ? r.ToUserId : r.FromUserId));

				var posts = await _unit.Post.FindAsync(query => query
							.Include(p => p.ReadPosts)
							.Where(p => friendsId.Contains((int)p.CreatedByUserId) && !p.ReadPosts.Any(r => r.UserId == UserId))
							.OrderByDescending(p => p.DateCreated)
							.Include(p => p.Medias)
							.Skip(OffSet)
							.Take(Limit));

				var user = await _unit.Users.GetByIdAsync(UserId);

				foreach (var item in posts)
				{
					item.ReadPosts.Add(user);
				}

				if (await _unit.CompleteAsync()) return posts;
				return null;

			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}

		}

		public async Task<IEnumerable<Post>> GetListById(int userid)
		{
			try
			{
				return await _unit.Post.FindAsync(query => query
						.Where(p => p.CreatedByUserId == userid));
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}
		}

		public Task<bool> Update(Post value)
		{
			throw new NotImplementedException();
		}
	}
}