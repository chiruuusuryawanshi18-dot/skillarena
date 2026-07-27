import { Controller, Get, Put, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.getUserProfile(user.id);
  }

  @Put('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@CurrentUser() user: any, @Body() data: any) {
    return this.usersService.updateProfile(user.id, data);
  }

  @Get(':userId/stats')
  @ApiOperation({ summary: 'Get user statistics' })
  async getStats(@Param('userId') userId: string) {
    return this.usersService.getUserStats(userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user profile by ID' })
  async getUser(@Param('userId') userId: string) {
    return this.usersService.getUserProfile(userId);
  }
}
