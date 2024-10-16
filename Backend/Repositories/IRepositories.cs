using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories;
	public interface IRepositories<T> where T : class
	{
		Task<List<T>> GetAll();
    	Task<List<T>> GetListByType(int condition, string type);
    	Task<T> GetById(int id);
    	Task<bool> Add(T product);
    	Task<bool> Update(T product);
    	Task<bool> Delete(int id);
	}