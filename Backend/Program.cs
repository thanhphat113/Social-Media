using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text;
using Backend.Data;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Backend.Repositories;
using Backend.Services;
using Backend.Helper;
using Backend.Models;
using Backend.Services.Interface;
using Backend.RealTime;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SocialMediaContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var token = context.Request.Cookies["Security"];
                    if (!string.IsNullOrEmpty(token))
                    {
                        context.Token = token;
                    }

                    return Task.CompletedTask;
                }
            };
        });

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();

builder.Services.AddScoped<PostNotiService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IService<MainTopic>, MainTopicService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<HistorySearchService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<MainTopicService>();
builder.Services.AddScoped<IChatInMessService, ChatInMessageService>();
builder.Services.AddScoped<RequestNotiService>();
builder.Services.AddScoped<PostNotiService>();
builder.Services.AddScoped<MediaService>();
builder.Services.AddScoped<RelationshipService>();


builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


builder.Services.AddScoped<JwtToken>();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // hoặc tên miền của frontend
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});




var app = builder.Build();
app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<SocialMediaContext>();
        // Kiểm tra kết nối
        context.Database.EnsureCreated(); // Hoặc context.Database.Migrate(); nếu bạn muốn áp dụng các migration
        if (context.Database.CanConnect())
        {
            Console.WriteLine("Kết nối đến cơ sở dữ liệu thành công!");
        }
        else
        {
            Console.WriteLine("Không thể kết nối đến cơ sở dữ liệu.");
        }
    }
    catch (Exception ex)
    {
        // Xử lý lỗi (nếu cần)
        Console.WriteLine($"Lỗi khi kết nối đến cơ sở dữ liệu: {ex.Message}");
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseCors("AllowAll");
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<OnlineHub>("/onlinehub");
});

app.MapControllers();

app.Run();

