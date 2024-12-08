using Backend.Repositories.Interface;
using Backend.Models;
using Backend.Data;

namespace Backend.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SocialMediaContext _context;

        // Khai báo các repository riêng tư
        private readonly IGenericRepository<User> _Users;
        private readonly IGenericRepository<ChatInMessage> _ChatInMessage;
        private readonly IGenericRepository<HistorySearch> _HistorySearch;
        private readonly IGenericRepository<Message> _Message;
        private readonly IGenericRepository<MainTopic> _main;
        private readonly IGenericRepository<Media> _Media;
        private readonly IGenericRepository<Post> _post;

        private readonly IGenericRepository<PostNotification> _PostNotification;
        private readonly IGenericRepository<RequestNotification> _RequestNotification;
        private readonly IGenericRepository<Relationship> _Relationship;
        private readonly IGenericRepository<UserGroup> _UserGroup;
        private readonly IGenericRepository<UserInGroup> _UserInGroup;

        public UnitOfWork(SocialMediaContext context,
                          IGenericRepository<User> Users,
                          IGenericRepository<Post> post,
                          IGenericRepository<ChatInMessage> ChatInMessage,
                          IGenericRepository<HistorySearch> HistorySearch,
                          IGenericRepository<Message> Message,
                          IGenericRepository<MainTopic> MainTopic,
                          IGenericRepository<PostNotification> PostNotification,
                          IGenericRepository<RequestNotification> RequestNotification,
                          IGenericRepository<Relationship> Relationship,
                          IGenericRepository<Media> Media,
                          IGenericRepository<UserGroup> UserGroup,
                          IGenericRepository<UserInGroup> UserInGroup)
        {
            _context = context;
            _Users = Users;
            _post = post;
            _main = MainTopic;
            _ChatInMessage = ChatInMessage;
            _HistorySearch = HistorySearch;
            _Message = Message;
            _PostNotification = PostNotification;
            _RequestNotification = RequestNotification;
            _Relationship = Relationship;
            _Media = Media;
            _UserGroup = UserGroup;
            _UserInGroup = UserInGroup;
        }

        // Các property chỉ đọc cho các repository
        public IGenericRepository<User> Users => _Users;
        public IGenericRepository<ChatInMessage> ChatInMessage => _ChatInMessage;
        public IGenericRepository<HistorySearch> HistorySearch => _HistorySearch;
        public IGenericRepository<Message> Message => _Message;
        public IGenericRepository<MainTopic> MainTopic => _main;
        public IGenericRepository<Media> Media => _Media;
        public IGenericRepository<Post> Post => _post;
        public IGenericRepository<PostNotification> PostNotification => _PostNotification;
        public IGenericRepository<RequestNotification> RequestNotification => _RequestNotification;
        public IGenericRepository<Relationship> Relationship => _Relationship;
        
        public IGenericRepository<UserGroup> UserGroup => _UserGroup;
        
        public IGenericRepository<UserInGroup> UserInGroup => _UserInGroup;

        // Phương thức SaveChanges
        public async Task<bool> CompleteAsync()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Dispose
        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
