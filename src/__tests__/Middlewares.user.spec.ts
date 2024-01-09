import { describe, it } from '@jest/globals';
import {  request, response } from 'express';
import { prismaMock } from './config/singleton';

import { admin, adminLogin, user, userLogin } from './DataUser';

import checkLogin from '../middlewares/user/checkLogin';
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import checkEmailExistence from '../middlewares/user/checkEmailExistence';
import checkNewPasswordEqualsOld from '../middlewares/user/checkNewPasswordEqualsOld';

describe('Testando os Middlewares user', () => {

  it('checkEmailAvailability Middleware: É impossivel criar um Usuario com Email ja existente', async () => {

    prismaMock.user.create({data : user});
    prismaMock.user.findFirst.mockResolvedValue(user);
    prismaMock.admin.create({data : admin});
    prismaMock.admin.findFirst.mockResolvedValue(admin);
        
    const next = jest.fn();
        
    request.body = {'email' : userLogin.email};
    request.baseUrl = '/user';
    await expect(checkEmailAvailability(request, response, next ))
      .rejects.toThrow('Este e-mail já está cadastrado.');

    request.body = adminLogin.email;
    request.baseUrl = '/admin';
    await expect(checkEmailAvailability(request, response, next ))
      .rejects.toThrow('Este e-mail já está cadastrado.');
  });

  it('checkLogin Middleware: É impossivel logar com Email não Registrado', async () => {
        
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.admin.findFirst.mockResolvedValue(null);

    const next = jest.fn();

    request.body = {
      email : userLogin.email,
      password : userLogin.password
    };

    request.baseUrl = '/user';
    await expect(checkLogin(request, response, next)).rejects.toThrow('Email Inválido');

    request.body = {
      email : adminLogin.email,
      password : adminLogin.password
    };

    request.baseUrl = '/admin';
    await expect(checkLogin(request, response, next)).rejects.toThrow('Email Inválido');

  });

  it('checkLogin Middleware: É impossivel logar com Senha Errada', async () => {
        
    prismaMock.user.findFirst.mockResolvedValue(user);
    prismaMock.admin.findFirst.mockResolvedValue(admin);

    const next = jest.fn();

    const SenhaErrada = '11233112';
        
    request.body = {
      email : userLogin.email,
      password : SenhaErrada
    };

    request.baseUrl = '/user';
    await expect(checkLogin(request, response, next)).rejects.toThrow('Senha Inválida');

    request.body = {
      email : adminLogin.email,
      password : SenhaErrada
    };

    request.baseUrl = '/admin';
    await expect(checkLogin(request, response, next)).rejects.toThrow('Senha Inválida');

  });

  it('checkEmailExistence: Deve ser possivel verifiar se o email nao esta cadastrado', async () => {

    prismaMock.user.findUnique.mockResolvedValue(null);

    request.body = { email : userLogin.email };
    const next = jest.fn();

    expect(checkEmailExistence(request, response, next)).rejects.toThrow("Email não cadastrado!");

    expect(next).not.toHaveBeenCalled();
  });

  it('checkNewPasswordEqualsOld: Se senhas sao iguais, deve levantar erro', async () => {

    prismaMock.user.findUnique.mockResolvedValue(user);

    request.body = { newPassword: userLogin.password };
    request.user = { id : user.id}
    const next = jest.fn();

    await expect(checkNewPasswordEqualsOld(request, response, next)).rejects.toThrow('A nova senha não pode ser igual à antiga');
  });
});