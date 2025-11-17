import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import { PermitApplication } from '@prisma/client';

@Injectable()
export class PermitsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPermitApplicationDto: CreatePermitApplicationDto,
  ): Promise<PermitApplication> {
    return this.prisma.permitApplication.create({
      data: createPermitApplicationDto,
    });
  }

  async findAll(): Promise<PermitApplication[]> {
    return this.prisma.permitApplication.findMany({
      orderBy: {
        submitted_at: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<PermitApplication> {
    return this.prisma.permitApplication.findUnique({
      where: { id },
    });
  }
}
