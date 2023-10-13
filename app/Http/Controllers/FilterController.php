<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filter; // Import your Filters model

class FilterController extends Controller
{
    public function saveFilters(Request $request)
    {
        $data = $request->input('filters');

        // Assuming your database table has a JSON column named 'filters'
        $savedFilter = new Filter();
        $savedFilter->filters = json_encode($data);
        $savedFilter->save();

        return response()->json(['message' => 'Filters saved successfully']);
    }

    public function getFilters()
    {
        $filters = Filter::all();
        return response()->json(['filters' => $filters]);
    }
}
