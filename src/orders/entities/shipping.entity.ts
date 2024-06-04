import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'shippings' })
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({nullable:true})
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  postcode: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: '' })
  country: string;

  @OneToOne(() => OrderEntity, (order) => order.shippingAddress)
  order: OrderEntity;
}
