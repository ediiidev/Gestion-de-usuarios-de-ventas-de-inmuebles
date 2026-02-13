import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./User.js";

export class House extends Model {
  public id!: number;
  public address!: string;
  public price!: number;
  public status!: string;
  public sellerId!: number;
}

House.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "available" },
    sellerId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },
  },
  { sequelize, modelName: "house" },
);

// Definición de la relación
User.hasMany(House, { foreignKey: "sellerId" });
House.belongsTo(User, { foreignKey: "sellerId", as: "seller" });
