import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver, I18nJsonLoader } from 'nestjs-i18n';
import * as path from 'path';
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
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        AcceptLanguageResolver,
      ],
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

