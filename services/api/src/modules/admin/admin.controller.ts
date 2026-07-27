import { Controller, Get, Post, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Admin')
@Controller('api/v1/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  async getDashboard(@CurrentUser() user: any) {
    return this.adminService.getDashboardStats(user.role);
  }

  @Get('users')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    this.adminService.getDashboardStats(user.role); // Verify admin
    return this.adminService.getAllUsers(page, limit);
  }

  @Post('users/:userId/suspend')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Suspend user' })
  async suspendUser(@CurrentUser() user: any, @Param('userId') userId: string) {
    return this.adminService.suspendUser(userId, user.role);
  }

  @Post('users/:userId/ban')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ban user' })
  async banUser(@CurrentUser() user: any, @Param('userId') userId: string) {
    return this.adminService.banUser(userId, user.role);
  }
}
