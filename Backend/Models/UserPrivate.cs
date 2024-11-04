using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
	public class UserPrivate
	{
		public int UserId { get; set; }

		public string FirstName { get; set; } = null!;

		public string LastName { get; set; } = null!;
		public int? GenderId { get; set; }
		public int? ProfilePicture { get; set; }


	}
}