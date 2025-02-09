import { OnModuleInit } from '@nestjs/common';
export declare class AppModule implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
    private handleMongoDBErrors;
}
