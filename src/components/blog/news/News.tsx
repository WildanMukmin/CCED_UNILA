import CardBig from '../utils/CardBig'
import CardSmall from '../utils/CardSmall'
import { type News } from '@prisma/client'
import PaginationNewsArticle from '../utils/Pagination'
import { getNews } from '@/data/data'

const NewsContent = async () => {
  const news = await getNews()
  const featuredNews = news[0]

  return (
    <main className='container mx-auto my-8 p-4 flex-col space-y-14'>
      {/* Main News Section */}
      <section>
        <h3 className='mb-4 text-2xl font-bold md:text-3xl text-[#025908]'>
          Berita Terbaru
        </h3>
        {featuredNews ? (
          <CardBig
            href='#'
            srcImage={featuredNews.thumbnail}
            title={featuredNews.title}
            description={featuredNews.content.slice(0, 250)}
            createdAt={featuredNews.createdAt ?? undefined}
          />
        ) : (
          <p>Loading berita terbaru...</p>
        )}
      </section>

      {/* Other News Section */}
      <section>
        <h3 className='mb-4 text-xl font-bold md:text-2xl text-[#025908]'>
          Berita Lainnya
        </h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {news.length > 0 ? (
            news
              .slice(1)
              .map((data: News) => (
                <CardSmall
                  href='#'
                  key={data.id}
                  srcImage={data.thumbnail}
                  title={data.title}
                  description={data.content.slice(0, 100)}
                  createdAt={data.createdAt ?? undefined}
                />
              ))
          ) : (
            <p>Loading berita lainnya...</p>
          )}
        </div>
      </section>
      <PaginationNewsArticle />
    </main>
  )
}

export default NewsContent
