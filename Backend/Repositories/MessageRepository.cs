using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
	public class MessageRepository : IRepositories<Message>
	{
		private readonly SocialMediaContext _context;
		public MessageRepository(SocialMediaContext context)
		{
			_context = context;
		}
		public Task<bool> Add(Message product)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Message>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<Message> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Message>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<ChatInMessage>> GetMessage(int user1, int user2)
		{
			return await _context.Messages
						.Where(m => m.User1 == user1 || m.User2 == user1)
						.Where(m => m.User1 == user2 || m.User2 == user2)
						.SelectMany(m => m.ChatInMessages)
						.ToListAsync();
		}


		public Task<bool> Update(Message product)
		{
			throw new NotImplementedException();
		}
	}
}