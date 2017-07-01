'use strict';

module.exports = function(sequelize, DataTypes) {
  var Ride = sequelize.define('Ride', {
    id: {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true,
    },
    ad_date: {
      type : DataTypes.STRING,
      allowNull: false
    },
    ad_message: {
      type : DataTypes.STRING,
      allowNull: true
    },
    depature_date: {
      type : DataTypes.DATE,
      allowNull: false
    },
    departure_adress: {
      type : DataTypes.STRING,
      allowNull: true
    },
    departure_postalCode: {
      type : DataTypes.STRING,
      allowNull: true
    },
    departure_city: {
      type : DataTypes.STRING,
      allowNull: true
    },
    arrival_date: {
      type : DataTypes.DATE,
      allowNull: false
    },
    arrival_adress: {
      type : DataTypes.STRING,
      allowNull: true
    },
    arrival_postalCode: {
      type : DataTypes.STRING,
      allowNull: true
    },
    arrival_city: {
      type : DataTypes.STRING,
      allowNull: true
    }
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Ride.belongsTo(models.User, { as:'Driver'});
        Ride.belongsToMany(models.User, {
          through:"Passengers",
          as:'Passengers'
        });
        Ride.belongsTo(models.Site, { as: 'Departure'});
        Ride.belongsTo(models.Site, { as: 'Arrival'});
      }
    },
    instanceMethods: {
      responsify: function() {
        let result = {};
        result.id = this.id;
        result.ad_date = this.ad_date;
        result.ad_message = this.ad_message;
        result.depature_date = this.depature_date;
        result.departure_adress = this.departure_adress;
        result.departure_city = this.departure_city;
        result.departure_postalCode = this.departure_postalCode;
        result.departure_idSite = this.departure_idSite;
        result.arrival_date = this.arrival_date;
        result.arrival_adress = this.arrival_adress;
        result.arrival_city = this.arrival_city;
        result.arrival_postalCode = this.arrival_postalCode;
        result.arrival_idSite = this.arrival_idSite;
        if(this.Driver){
          result.driver = this.Driver.responsify();
        }
        if(this.Passengers){
          result.passengers = this.Passengers;
        }
        if(this.Departure){
          result.departure = this.Departure.responsify();
        }
        if(this.Arrival){
          result.arrival = this.Arrival.responsify();
        }
        return result;
      }
    }
  });
  return Ride;
};
