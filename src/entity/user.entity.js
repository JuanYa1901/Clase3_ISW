"user strict"
import {EntitySchema} from "typeorm"

const UserSchema = new EntitySchema({
    name:"User", //lo que ingresa
    tableName: "User", // Nombre de la tabla
    columns:{

        id: {

            type: "int",
            primary: true,
            generated: true,
        },

        nombreCompleto:{

            type: "varchar",
            length: 255,
            nullable: false,
        },

        rut:{

            type: "varchar",
            length: 12,
            nullable: false,
            unique: true,
        },

        email: {

            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,

        },

        createAt:{

            type: "time with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,

        },

        updateAt:{

            type: "time with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,

        }

    }
}) 

export default UserSchema
