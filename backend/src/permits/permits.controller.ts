import { Controller, Get, Post, Body, Param, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { PermitsService } from './permits.service';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { PermitApplicationSchema } from './schemas/permit.schema';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(PermitApplicationSchema))
  async create(@Body() createPermitApplicationDto: CreatePermitApplicationDto) {
    try {
      return await this.permitsService.create(createPermitApplicationDto);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create permit application',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.permitsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch permit applications',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const permit = await this.permitsService.findOne(id);
      if (!permit) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Permit application not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return permit;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch permit application',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
