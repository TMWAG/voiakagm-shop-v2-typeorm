import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.db.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn((createUserDto: CreateUserDto) => {
              return {
                id: Date.now(),
                ...createUserDto,
                role: UserRole.CUSTOMER,
                vkLink: null,
                tgLink: null,
                token: randomUUID(),
              };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      name: 'Никита',
      surname: 'Нечаев',
      email: 'example@mail.me',
      phone: '+79991112233',
      password: 'RandomPass111',
    };
    it('should return user', async () => {
      expect(service.create(createUserDto)).toEqual({
        id: expect.any(Number),
        ...createUserDto,
        role: UserRole.CUSTOMER,
        vkLink: null,
        tgLink: null,
        token: expect.any(String),
      });
    });
  });
});
