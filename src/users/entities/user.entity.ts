
import { Entity  , PrimaryGeneratedColumn ,  Column, Timestamp , CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Roles } from "../utility/common/user-roles.enum";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";


@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;


    @Column({unique:true})
    email: string;


    @Column({select:false})
    password: string;


    @Column({type: 'enum', enum:Roles , array:true ,  default : [ Roles.USER]})
    roles:Roles[];


    @CreateDateColumn()
    createdAt:Timestamp;

    @UpdateDateColumn()
    updatedAt:Timestamp;

    @OneToMany(()=>CategoryEntity, (cat)=>cat.addedBy)
    categories:CategoryEntity

    @OneToMany(()=>ProductEntity, (prod)=>prod.addedBy)
    products:ProductEntity
    
    @OneToMany(()=>ReviewEntity, (rev)=>rev.user)
    reviews:ReviewEntity[];

}
 