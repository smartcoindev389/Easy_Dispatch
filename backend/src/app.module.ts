import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuotesModule } from './quotes/quotes.module';
import { CarriersModule } from './carriers/carriers.module';
import { BillingModule } from './billing/billing.module';
import { FirestoreModule } from './firestore/firestore.module';
import { CommonModule } from './common/common.module';
import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      envFilePath: ['.env.local', '.env'],
    }),
    CommonModule,
    AuthModule,
    FirestoreModule,
    BillingModule,
    CarriersModule,
    QuotesModule,
  ],
})
export class AppModule {}

