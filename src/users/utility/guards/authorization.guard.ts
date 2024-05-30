import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthorizeGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const allowRoles = this.reflector.get<string[]>('allowRoles', context.getHandler()); 
        const request = context.switchToHttp().getRequest();
        if (request?.currentUser?.roles && allowRoles) {
            const result = request.currentUser.roles.some((role: string) => allowRoles.includes(role));
            if (result) return true;
        }
        
        throw new UnauthorizedException('Sorry, you are not authorized!');
    }
}
