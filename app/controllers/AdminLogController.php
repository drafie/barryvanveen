<?php

use Rap2hpoutre\LaravelLogViewer\LaravelLogViewer;

class AdminLogController extends BaseController
{
    /**
     * @see LogViewerController
     */
    public function index()
    {
        $this->setPageTitle('Logs');

        if (\Input::get('l')) {
            LaravelLogViewer::setFile(base64_decode(\Input::get('l')));
        }

        $logs = LaravelLogViewer::all();

        return View::make('laravel-log-viewer::log', [
            'logs'         => $logs,
            'files'        => LaravelLogViewer::getFiles(true),
            'current_file' => LaravelLogViewer::getFileName(),
        ]);
    }
}