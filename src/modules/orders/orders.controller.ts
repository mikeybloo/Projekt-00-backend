import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import { OrdersService } from './orders.service'
import { Public } from 'decorators/public.decorator'

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page: number): Promise<PaginatedResult> {
    return this.ordersService.paginate(page, ['order_items'])
  }

  @Post('export')
  @HttpCode(HttpStatus.OK)
  async export(@Res() response: Response): Promise<any> {
    return this.ordersService.export(response)
  }

  @Get('chart')
  async chart(): Promise<{ date: string; sum: string }[]> {
    return this.ordersService.chart()
  }
}
