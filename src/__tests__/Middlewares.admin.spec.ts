import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkAdvancedAdminPermission from '../middlewares/admin/checkAdvancedAdminPermission';

import { admin, } from './DataUser';

describe('Testando os Middlewares Book', () => {

  it('checkAdvancedAdminPermission Middleware: Deve ser possivel checar o Nivel de Autorização', async () => {

    const next = jest.fn().mockReturnValue('ok');
    
    request.admin = { authorityLevel: admin.authorityLevel }; // autorização = 1
    await expect(checkAdvancedAdminPermission(request, response, next)).rejects.toThrow('Você não tem permissão para acessar essa rota');

    request.admin.authorityLevel = 2;
    await expect(checkAdvancedAdminPermission(request, response, next)).resolves.toBe('ok');

  });
});