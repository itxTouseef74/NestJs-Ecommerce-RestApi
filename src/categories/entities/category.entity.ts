
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})


export class CategoryEntity {
  
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    description:string
    @CreateDateColumn()
    createdAt: Timestamp
    @UpdateDateColumn()
    updatedAt: Timestamp

    @ManyToOne(()=>UserEntity,(user)=>user.categories)
    addedBy:UserEntity

    @ManyToOne(()=> ProductEntity , (prod)=> prod.category)
    products:ProductEntity[];

}
