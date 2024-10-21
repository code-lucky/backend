import { Controller } from "@nestjs/common";
import { BackendService } from "./backend.service";

@Controller('backend')
export class BackendController {
  constructor(private readonly appService: BackendService) {}
}