import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from '../src/utils/prisma';

async function createAdmin() {
  try {
    const email = 'admin@admin.com';
    const name = 'admin';
    const password = 'admin';
    const role = 'ADMIN'; // Usando string diretamente

    // Verificar se o admin já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('❌ Usuário admin já existe!');
      console.log(`   ID: ${existingAdmin.id}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        status: true,
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('');
    console.log('📋 Credenciais:');
    console.log(`   Nome: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Senha: ${password}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   ID: ${admin.id}`);
    console.log('');
    console.log('🔐 Você pode fazer login com essas credenciais em:');
    console.log('   POST http://localhost:3000/api/auth/login');
    console.log('');
    console.log('📝 Exemplo de requisição:');
    console.log('   {');
    console.log('     "email": "admin@admin.com",');
    console.log('     "password": "admin"');
    console.log('   }');

    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

createAdmin();

