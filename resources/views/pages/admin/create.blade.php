@extends('layouts.full-width')

@section('content')

    <div class="page-header">
        <h1 class="overview-heading">{{ trans('page-admin.header-add') }}</h1>
    </div>

    <div class="page__content">
        {!! Form::open(['route' => 'admin.page-new', 'method' => 'POST']) !!}

        @include('pages.admin.partials.form-fields')

        {!! Form::submit(trans('general.add'), ['class' => 'btn btn-primary']) !!}

        {!! Form::close() !!}
    </div>

@stop
