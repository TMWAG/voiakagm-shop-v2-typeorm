import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.db.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const userPhone = '+79991112233';
  const createUserDto: CreateUserDto = {
    name: 'Никита',
    surname: 'Нечаев',
    email: 'example@mail.me',
    phone: userPhone,
    password: 'RandomPass111',
  };
  const userMock = (createUserDto: CreateUserDto): User => {
    return {
      id: Date.now(),
      ...createUserDto,
      role: UserRole.CUSTOMER,
      vkLink: null,
      tgLink: null,
      token: randomUUID(),
    };
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn((createUserDto: CreateUserDto) => {
              return userMock(createUserDto);
            }),
            findOneBy: jest.fn(() => {
              return { ...userMock(createUserDto) };
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
    it('should return user', async () => {
      expect(service.create(createUserDto)).toEqual({
        ...userMock(createUserDto),
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
  });

  describe('find one by phone number', () => {
    it('should return user with matching phone number', () => {
      expect(service.findOneByPhone(userPhone)).toEqual({
        ...userMock(createUserDto),
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
  });
});
