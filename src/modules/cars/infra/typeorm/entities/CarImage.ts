import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToMany, JoinColumn } from "typeorm";
import { Car } from "./Car"

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id: string;

    @ManyToMany(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;
}

export { CarImage };