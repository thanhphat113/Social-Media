
namespace Backend.Models
{
	public class Gender
	{
		public int GenderId { get; set; }
		public string GenderName { get; set; }

		public virtual ICollection<User> Users { get; set; }
	}
}