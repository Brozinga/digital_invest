using digital.data.DbContext;
using System;

namespace digital.data.Repository
{
    public abstract class GenericRepository
    {
        protected readonly MongoDbContext _dbContext;

        public GenericRepository(MongoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual void Dispose()
        {
            GC.SuppressFinalize(this);
        }

    }
}
