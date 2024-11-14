using AutoMapper;
using Backend.Models;

namespace Backend.AutoMapper;
public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, UserPrivate>();
		CreateMap<User, UserLogin>();
	}
}
