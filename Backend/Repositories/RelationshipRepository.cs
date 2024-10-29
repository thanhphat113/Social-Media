using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;
public class RelationshipRepository : IRepositories<Relationship>
{
	private readonly SocialMediaContext _context;
	public RelationshipRepository(SocialMediaContext context)
	{
		_context = context;
	}
	public Task<bool> Add(Relationship product)
	{
		throw new NotImplementedException();
	}

	public Task<bool> Delete(int id)
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

	public Task<IEnumerable<Relationship>> GetListByType(int condition, string type)
	{
		throw new NotImplementedException();
	}



	public Task<bool> Update(Relationship product)
	{
		throw new NotImplementedException();
	}
}