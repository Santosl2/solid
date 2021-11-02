import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToMany, JoinColumn } from "typeorm";
import { Car } from "./Car";
import { v4 as uuid } from "uuid";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id?: string;

    @ManyToMany(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { CarImage };