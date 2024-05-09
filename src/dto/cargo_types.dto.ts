import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CargoTypesEntity } from 'src/model/cargo_types.entity';

export class CargoTypesDto implements Readonly<CargoTypesDto> {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  public static from(dto: Partial<CargoTypesDto>) {
    const it = new CargoTypesDto();
    it.id = dto.id ?? 0;
    it.name = dto.name ?? '';
    return it;
  }

  public static fromEntity(entity: CargoTypesEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
    });
  }

  public toEntity() {
    const it = new CargoTypesEntity();
    it.id = this.id;
    it.name = this.name;
    return it;
  }
}
