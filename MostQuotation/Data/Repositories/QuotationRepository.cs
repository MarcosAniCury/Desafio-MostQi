﻿using MongoDB.Bson;
using MongoDB.Driver;
using MostQuotation.Data.MongoSettings;
using MostQuotation.Models;
using System.Xml.Linq;

namespace MostQuotation.Data.Repositories
{
    public class QuotationRepository : IQuotationRepository
    {
        private readonly IMongoCollection<DollarQuotation> _dbCollection;

        public QuotationRepository(IMongoSettings mongoSettings)
        {
            var client = new MongoClient(mongoSettings.Connection);
            var database = client.GetDatabase(mongoSettings.DatabaseName);

            _dbCollection = database.GetCollection<DollarQuotation>(typeof(DollarQuotation).Name);
        }

        public DollarQuotation FindByDateAndQuotation(DateTime date, double valueQuotation) 
        {
            return _dbCollection.Find(quotation => quotation.DateTime == date && quotation.Quotation == valueQuotation).FirstOrDefault();
        }

        public List<DollarQuotation> FindByDate(DateTime firstDate, DateTime secondDate)
        {
            var filter = new BsonDocument { 
                { 
                    "DateTime", 
                    new BsonDocument { 
                        { "$gt", firstDate }, 
                        { "$lt", secondDate } 
                    } 
                } 
            };
            return _dbCollection.Find(filter).ToList();
        }

        public DollarQuotation Create(DollarQuotation quotation)
        {
            DollarQuotation findQuotation = FindByDateAndQuotation(quotation.DateTime, quotation.Quotation);
            if (findQuotation != null)
            {
                return null;
            }
            _dbCollection.InsertOne(quotation);
            return quotation;
        }
    }
}
