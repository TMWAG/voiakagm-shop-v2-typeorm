import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.db.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const userPhone = '+79991112233';
  const userEmail = 'example@mail.me';
  const createUserDto: CreateUserDto = {
    name: 'Никита',
    surname: 'Нечаев',
    email: userEmail,
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
            findOneByOrFail: jest.fn(() => {
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
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should return user', () => {
      expect(service.create(createUserDto)).toEqual({
        ...userMock(createUserDto),
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
  });

  describe('find one user by phone number', () => {
    it('should be defined', () => {
      expect(service.findOneByPhone).toBeDefined();
    });
    it('should return user with matching phone number', () => {
      expect(service.findOneByPhone(userPhone)).toEqual({
        ...userMock(createUserDto),
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
  });

  describe('find one user by email', () => {
    it('should be defined', () => {
      expect(service.findOneByEmail).toBeDefined();
    });
    it('should return user with matching email', () => {
      expect(service.findOneByEmail(userEmail)).toEqual({
        ...userMock(createUserDto),
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
  });
});
