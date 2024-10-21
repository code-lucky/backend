import { PartialType } from '@nestjs/swagger';
import { CreateRoleDatumDto } from './create-role-datum.dto';

export class UpdateRoleDatumDto extends PartialType(CreateRoleDatumDto) {}
