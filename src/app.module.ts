import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { Admin } from "./admins/models/admin.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/models/role.model";
import { WorkersModule } from "./workers/workers.module";
import { Worker } from "./workers/models/worker.model";
import { PaymentTypeModule } from "./payment_type/payment_type.module";
import { Payment_type } from "./payment_type/models/payment_type.model";
import { PaymentStatusModule } from "./payment_status/payment_status.module";
import { Payment_status } from "./payment_status/models/payment_status.model";
import { ProductTypeModule } from "./product_type/product_type.module";
import { Product_type } from "./product_type/models/product_type.model";
import { ProductsModule } from "./products/products.module";
import { Products } from "./products/models/product.model";
import { ClientsModule } from "./clients/clients.module";
import { Client } from "./clients/models/client.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/models/order.model";
import { PaymentModule } from "./payment/payment.module";
import { Payment } from "./payment/models/payment.model";
import { OrderStatusModule } from './order_status/order_status.module';
import { OrderStatus } from "./order_status/models/order_status.model";
import { PublishedProductsModule } from './published_products/published_products.module';
import { PublishedProduct } from "./published_products/models/published_product.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Role,
        Worker,
        Payment_type,
        Payment_status,
        Product_type,
        Products,
        Client,
        Order,
        Payment,
        OrderStatus,
        PublishedProduct
      ],
      autoLoadModels: true,
      sync: { alter: true }, //force
      logging: false,
    }),
    AdminsModule,
    AuthModule,
    RolesModule,
    WorkersModule,
    PaymentTypeModule,
    PaymentStatusModule,
    ProductTypeModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
    PaymentModule,
    OrderStatusModule,
    PublishedProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
