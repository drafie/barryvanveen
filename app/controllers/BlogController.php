<?php

use Barryvanveen\Blogs\BlogRepository;
use Barryvanveen\Blogs\Commands\CreateRssFeedCommand;
use Flyingfoxx\CommandCenter\CommandBus;

class BlogController extends BaseController
{
    /**
     * @var BlogRepository
     */
    private $blogRepository;

    /** @var CommandBus */
    private $commandBus;

    /**
     * @param BlogRepository $blogRepository
     * @param CommandBus     $commandBus
     */
    public function __construct(BlogRepository $blogRepository, CommandBus $commandBus)
    {
        $this->blogRepository = $blogRepository;
        $this->commandBus     = $commandBus;
    }

    /**
     * display full-list of blog items.
     *
     * @return View
     */
    public function index()
    {
        $blogs = $this->blogRepository->published();

        Head::title('Blog');
        Head::description('Een blog van Barry van Veen over programmeren, PHP, Laravel Framework en aanverwante zaken
        .');

        return View::make('blog.full-list', compact('blogs'));
    }

    /**
     * display blog item.
     *
     * @return mixed
     */
    public function show($id, $slug)
    {
        $blog = $this->blogRepository->findPublishedById($id);

        // redirect to url with valid slug
        if ($slug !== $blog->slug) {
            return Redirect::route('blog-item', ['id' => $id, 'slug' => $blog->slug], 301);
        }

        Head::title($blog->title);
        Head::description($blog->summary);

        return View::make('blog.item', compact('blog'));
    }

    /**
     * display RSS feed of all blog items.
     *
     * @return \Illuminate\Http\Response
     */
    public function rss()
    {
        $rss = $this->commandBus->execute(
            new CreateRssFeedCommand()
        );

        return Response::make($rss, 200, ['Content-Type' => 'text/xml']);
    }
}
