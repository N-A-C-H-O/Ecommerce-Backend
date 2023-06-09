import container from "../../container.js";

import { createHash, isValidPassword } from "../../shared/index.js";

import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";

class SessionManager {
    #UserRepository = container.resolve("UserRepository");

    async create(data) {
        const user = await userCreateSchema.parseAsync(data);

        const exits = await this.#UserRepository.findByEmail(user.email);

        if (exits) throw new Error("User already exist");

        return await this.#UserRepository.insertOne({...user, password: await createHash(user.password)});
    }

    async validate(data) {
        const { email, password } = await userLoginSchema.parseAsync(data);

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("Incorrect user");

        const validation = await isValidPassword(user, password);
        
        if (!validation) throw new Error("Incorrect password"); 

        return user;
    }
}

export default SessionManager;
