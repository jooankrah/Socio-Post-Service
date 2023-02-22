import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import * as path from 'path';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { User } from './user/entities/user.entity';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception?.code || error?.message,
        };
        return graphQLFormattedError;
      },
      autoSchemaFile: {
        federation: 2,
        path: path.join(process.cwd(), 'src/@generated/schema.gql'),
      },
      sortSchema: true,
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostModule,
    CommentModule,
    UserModule,
  ],
})
export class AppModule {}
