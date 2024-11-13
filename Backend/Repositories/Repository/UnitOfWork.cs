using Backend.Repositories.Interface;
using Backend.Models;
using Backend.Data;

namespace Backend.Repositories.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SocialMediaContext _context;

        // Khai báo các repository riêng tư
        private readonly IGenericRepository<User> _Users;
        private readonly IGenericRepository<ChatInMessage> _ChatInMessage;
        private readonly IGenericRepository<GroupChat> _GroupChat;
        private readonly IGenericRepository<HistorySearch> _HistorySearch;
        private readonly IGenericRepository<Message> _Message;
        private readonly IGenericRepository<PostNotification> _PostNotification;
        private readonly IGenericRepository<RequestNotification> _RequestNotification;
        private readonly IGenericRepository<Relationship> _Relationship;

        public UnitOfWork(SocialMediaContext context,
                          IGenericRepository<User> Users,
                          IGenericRepository<ChatInMessage> ChatInMessage,
                          IGenericRepository<GroupChat> GroupChat,
                          IGenericRepository<HistorySearch> HistorySearch,
                          IGenericRepository<Message> Message,
                          IGenericRepository<PostNotification> PostNotification,
                          IGenericRepository<RequestNotification> RequestNotification,
                          IGenericRepository<Relationship> Relationship)
        {
            _context = context;
            _Users = Users;
            _ChatInMessage = ChatInMessage;
            _GroupChat = GroupChat;
            _HistorySearch = HistorySearch;
            _Message = Message;
            _PostNotification = PostNotification;
            _RequestNotification = RequestNotification;
            _Relationship = Relationship;
        }

        // Các property chỉ đọc cho các repository
        public IGenericRepository<User> Users => _Users;
        public IGenericRepository<ChatInMessage> ChatInMessage => _ChatInMessage;
        public IGenericRepository<GroupChat> GroupChat => _GroupChat;
        public IGenericRepository<HistorySearch> HistorySearch => _HistorySearch;
        public IGenericRepository<Message> Message => _Message;
        public IGenericRepository<PostNotification> PostNotification => _PostNotification;
        public IGenericRepository<RequestNotification> RequestNotification => _RequestNotification;
        public IGenericRepository<Relationship> Relationship => _Relationship;

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
