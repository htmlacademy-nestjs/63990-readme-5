import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_POST_CONTENT_ENTITY_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_POST_CONTENT_ENTITY_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPostsContentEntities() {
  return [
    { 
      id: FIRST_POST_CONTENT_ENTITY_UUID,
      title: 'Полезный пост про Байкал',
      preview: 'Озеро Байкал – огромное древнее озеро в горах Сибири к северу от монгольской границы. Байкал считается самым глубоким озером в мире.',
      text: 'Озеро Байкал – огромное древнее озеро в горах Сибири к северу от монгольской границы. Байкал считается самым глубоким озером в мире. Он окружен сетью пешеходных маршрутов, называемых Большой байкальской тропой. Деревня Листвянка, расположенная на западном берегу озера, – популярная отправная точка для летних экскурсий. Зимой здесь можно кататься на коньках и собачьих упряжках.',
    },
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      status: 'published',
      postType: 'text',
      postTypeEntityId: FIRST_POST_CONTENT_ENTITY_UUID,
      comments: [
        {
          message: 'Красота!',
          userId: FIRST_USER_ID,
        },
      ]
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPostContentEntities = getPostsContentEntities();
  for (const post of mockPostContentEntities) {
    await prismaClient.textPost.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        text: post.text,
        preview: post.preview
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        status: post.status,
        userId: post.userId,
        type: post.postType,
        contentEntityId: post.postTypeEntityId,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();