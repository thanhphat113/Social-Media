using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
	public class MessageService : IMessageRepository
	{
		private readonly IUnitOfWork _unit;
		public MessageService(IUnitOfWork unit)
		{
			_unit = unit;
		}


		public async Task<Message> Add(Message value)
		{
			try
			{
				var item = await _unit.Message.AddAsync(value);
				await _unit.CompleteAsync();
				return item;
			}
			catch (System.Exception ex)
			{
				return null;
				throw;
			}
		}

		public async Task<Message> FindBy2User(int user1, int user2)
		{
			var predicate = (Expression<Func<Message, bool>>)(u =>
					(u.User1 == user1 && u.User2 == user2) ||
					(u.User1 == user2 && u.User2 == user1));
			var selector = (Expression<Func<Message, Message>>)
					(m => new Message
					{
						MessagesId = m.MessagesId,
						User1 = m.User1,
						User2 = m.User2,
						NickName1 = m.NickName1,
						NickName2 = m.NickName2,
						MainTopicNavigation = m.MainTopicNavigation,
					});

			return await _unit.Message.GetByConditionAsync(predicate, selector);
		}

		public Task<bool> Update(Message value)
		{
			throw new NotImplementedException();
		}
	}
}