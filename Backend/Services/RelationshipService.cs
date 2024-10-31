using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;

namespace Backend.Services
{
	public class RelationshipService : IService<Relationship>
	{
		public Task<string> Add(Relationship product)
		{
			throw new NotImplementedException();
		}

		public Task<string> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Relationship>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<Relationship> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Relationship>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<string> Update(Relationship product)
		{
			throw new NotImplementedException();
		}
	}
}