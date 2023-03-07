import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { dtoValidationError } from 'src/errors/messages/dto-validation.messages';
import { User } from '../entities/user.db.entity';

export class CreateUserDto implements Partial<User> {
  @ApiProperty({
    example: 'Никита',
    description: 'Имя пользователя',
    required: true,
  })
  @Type(() => String)
  @MinLength(2, {
    message: dtoValidationError.length.min(2),
  })
  @MaxLength(25, {
    message: dtoValidationError.length.max(25),
  })
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 'Нечаев',
    description: 'Фамилия пользователя',
    required: true,
  })
  @Type(() => String)
  @MinLength(2, {
    message: dtoValidationError.length.min(2),
  })
  @MaxLength(25, {
    message: dtoValidationError.length.max(25),
  })
  readonly surname: string;

  @ApiProperty({
    example: 'example@mail.me',
    description: 'Email пользователя',
    required: true,
  })
  @Type(() => String)
  @IsEmail(undefined, {
    message: dtoValidationError.type.email,
  })
  @MaxLength(40, {
    message: dtoValidationError.length.max(40),
  })
  readonly email: string;

  @ApiProperty({
    example: '+79991112233',
    description: 'Номер телефона пользователя',
    required: true,
  })
  @Type(() => String)
  @IsPhoneNumber(undefined, {
    message: dtoValidationError.type.phone,
  })
  readonly phone: string;

  @ApiProperty({
    example: 'StrongPa55word_1',
    description: 'Пароль пользователя',
    required: true,
  })
  @Type(() => String)
  @MinLength(8, {
    message: dtoValidationError.length.min(8),
  })
  @MaxLength(255, {
    message: dtoValidationError.length.max(255),
  })
  @IsStrongPassword(undefined, {
    message: dtoValidationError.type.password,
  })
  readonly password: string;
}
