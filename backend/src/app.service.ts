import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
	getTest() {
		return [{ hello: "world" }]
	}
}
