import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.db.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const userPhone = '+79991112233';
  const notRegisteredPhone = '+79998882244';
  const notRegisteredEmail = 'non@exis.tent';
  const userEmail = 'example@mail.me';
  const userToken = randomUUID();
  const createUserDtoMock: CreateUserDto = {
    name: 'Никита',
    surname: 'Нечаев',
    email: userEmail,
    phone: '+79993332211',
    password: 'RandomPass111',
  };
  const mockUsers: User[] = [
    {
      id: 1,
      name: createUserDtoMock.name,
      surname: createUserDtoMock.surname,
      email: userEmail,
      phone: createUserDtoMock.phone,
      password: createUserDtoMock.password,
      role: UserRole.CUSTOMER,
      vkLink: null,
      tgLink: null,
      token: randomUUID(),
    },
    {
      id: Date.now(),
      name: 'Горо',
      surname: 'Маджима',
      email: 'yakuza@owo.com',
      phone: '+79992221133',
      password: 'randPass@@334',
      role: UserRole.SUPERVISOR,
      vkLink: null,
      tgLink: null,
      token: userToken,
    },
    {
      id: Date.now(),
      name: 'Сергей',
      surname: 'Куров',
      email: 'email@mail.com',
      phone: userPhone,
      password: 'RandP455w2#',
      role: UserRole.ADMIN,
      vkLink: null,
      tgLink: null,
      token: randomUUID(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn((createUserDtoMock: CreateUserDto) => {
              return {
                ...createUserDtoMock,
                ...mockUsers[0],
              };
            }),
            findOneBy: jest.fn(
              async (
                where: FindOptionsWhere<User>,
              ): Promise<User | undefined> => {
                if (where.id) {
                  const result = mockUsers.find(({ id }) => id === where.id);
                  return result ? result : null;
                }
                if (where.phone) {
                  const result = mockUsers.find(
                    ({ phone }) => phone === where.phone,
                  );
                  return result ? result : null;
                }
                if (where.email) {
                  const result = mockUsers.find(
                    ({ email }) => email === where.email,
                  );
                  return result ? result : null;
                }
                if (where.token) {
                  const result = mockUsers.find(
                    ({ token }) => token === where.token,
                  );
                  return result ? result : null;
                }
                return null;
              },
            ),
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
      expect(service.create(createUserDtoMock)).toEqual({
        ...mockUsers[0],
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
      expect(service.findOneByPhone(userPhone)).resolves.toEqual({
        ...mockUsers[2],
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
    it('should return undefined', () => {
      expect(service.findOneByPhone(notRegisteredPhone)).resolves.toBeNull();
    });
  });

  describe('find one user by email', () => {
    it('should be defined', () => {
      expect(service.findOneByEmail).toBeDefined();
    });
    it('should return user with matching email', async () => {
      expect(service.findOneByEmail(userEmail)).resolves.toEqual({
        ...mockUsers[0],
        id: expect.any(Number),
        token: expect.any(String),
      });
    });
    it('should return undefined', () => {
      expect(service.findOneByEmail(notRegisteredEmail)).resolves.toBeNull();
    });
  });
});
